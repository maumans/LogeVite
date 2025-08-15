const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();
const messaging = admin.messaging();

// Matching system: when a new listing is created, find matching requests
exports.matchListingToRequests = functions.firestore
  .document('listings/{listingId}')
  .onCreate(async (snap, context) => {
    const listing = snap.data();
    const listingId = context.params.listingId;
    
    try {
      // Only process active listings
      if (listing.status !== 'active') {
        return null;
      }

      // Find matching requests
      const requestsQuery = db.collection('requests')
        .where('active', '==', true)
        .where('transactionType', '==', listing.transactionType)
        .where('propertyType', '==', listing.propertyType)
        .where('budgetMin', '<=', listing.price)
        .where('budgetMax', '>=', listing.price);

      const matchingRequests = await requestsQuery.get();
      
      const batch = db.batch();
      const notifications = [];

      for (const requestDoc of matchingRequests.docs) {
        const request = requestDoc.data();
        const requestId = requestDoc.id;
        
        // Check location proximity (basic implementation)
        const distance = calculateDistance(
          listing.location.latitude,
          listing.location.longitude,
          request.location.latitude,
          request.location.longitude
        );
        
        // Match if within radius (default 10km)
        const maxDistance = request.searchRadius || 10;
        if (distance <= maxDistance) {
          // Create match record
          const matchRef = db.collection('requests').doc(requestId)
            .collection('matches').doc(listingId);
          
          batch.set(matchRef, {
            listingId: listingId,
            matchedAt: admin.firestore.FieldValue.serverTimestamp(),
            distance: distance,
            score: calculateMatchScore(listing, request)
          });
          
          // Prepare notification
          notifications.push({
            userId: request.userId,
            title: 'Nouvelle annonce correspondante !',
            body: `Un ${listing.propertyType} à ${listing.location.address} correspond à votre recherche`,
            data: {
              type: 'match',
              listingId: listingId,
              requestId: requestId
            }
          });
        }
      }
      
      // Commit matches
      await batch.commit();
      
      // Send notifications
      for (const notification of notifications) {
        await sendNotificationToUser(notification);
      }
      
      console.log(`Found ${notifications.length} matches for listing ${listingId}`);
      return null;
      
    } catch (error) {
      console.error('Error in matchListingToRequests:', error);
      return null;
    }
  });

// Matching system: when a new request is created, find matching listings
exports.matchRequestToListings = functions.firestore
  .document('requests/{requestId}')
  .onCreate(async (snap, context) => {
    const request = snap.data();
    const requestId = context.params.requestId;
    
    try {
      // Only process active requests
      if (!request.active) {
        return null;
      }

      // Find matching listings
      const listingsQuery = db.collection('listings')
        .where('status', '==', 'active')
        .where('transactionType', '==', request.transactionType)
        .where('propertyType', '==', request.propertyType)
        .where('price', '>=', request.budgetMin)
        .where('price', '<=', request.budgetMax);

      const matchingListings = await listingsQuery.get();
      
      const batch = db.batch();
      let matchCount = 0;

      for (const listingDoc of matchingListings.docs) {
        const listing = listingDoc.data();
        const listingId = listingDoc.id;
        
        // Check location proximity
        const distance = calculateDistance(
          listing.location.latitude,
          listing.location.longitude,
          request.location.latitude,
          request.location.longitude
        );
        
        const maxDistance = request.searchRadius || 10;
        if (distance <= maxDistance) {
          // Create match record
          const matchRef = db.collection('requests').doc(requestId)
            .collection('matches').doc(listingId);
          
          batch.set(matchRef, {
            listingId: listingId,
            matchedAt: admin.firestore.FieldValue.serverTimestamp(),
            distance: distance,
            score: calculateMatchScore(listing, request)
          });
          
          matchCount++;
        }
      }
      
      await batch.commit();
      
      // Notify user about matches found
      if (matchCount > 0) {
        await sendNotificationToUser({
          userId: request.userId,
          title: 'Annonces trouvées !',
          body: `${matchCount} annonce(s) correspondent à votre demande`,
          data: {
            type: 'request_matches',
            requestId: requestId,
            matchCount: matchCount.toString()
          }
        });
      }
      
      console.log(`Found ${matchCount} matches for request ${requestId}`);
      return null;
      
    } catch (error) {
      console.error('Error in matchRequestToListings:', error);
      return null;
    }
  });

// Send notification when a new message is received
exports.sendMessageNotification = functions.firestore
  .document('conversations/{conversationId}/messages/{messageId}')
  .onCreate(async (snap, context) => {
    const message = snap.data();
    const conversationId = context.params.conversationId;
    
    try {
      // Get conversation details
      const conversationDoc = await db.collection('conversations')
        .doc(conversationId).get();
      
      if (!conversationDoc.exists) {
        return null;
      }
      
      const conversation = conversationDoc.data();
      const participants = conversation.participants;
      
      // Find recipient (not the sender)
      const recipientId = participants.find(id => id !== message.senderId);
      
      if (!recipientId) {
        return null;
      }
      
      // Get sender info
      const senderDoc = await db.collection('users').doc(message.senderId).get();
      const sender = senderDoc.data();
      
      // Send notification to recipient
      await sendNotificationToUser({
        userId: recipientId,
        title: sender.firstName || 'Nouveau message',
        body: message.type === 'text' ? message.text : 'Fichier joint',
        data: {
          type: 'message',
          conversationId: conversationId,
          senderId: message.senderId
        }
      });
      
      return null;
      
    } catch (error) {
      console.error('Error in sendMessageNotification:', error);
      return null;
    }
  });

// Update user's last active timestamp
exports.updateUserActivity = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Must be authenticated');
  }
  
  const userId = context.auth.uid;
  
  try {
    await db.collection('users').doc(userId).update({
      lastActive: admin.firestore.FieldValue.serverTimestamp()
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error updating user activity:', error);
    throw new functions.https.HttpsError('internal', 'Failed to update activity');
  }
});

// Clean up expired listings
exports.cleanupExpiredListings = functions.pubsub
  .schedule('every 24 hours')
  .onRun(async (context) => {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const expiredListings = await db.collection('listings')
        .where('status', '==', 'inactive')
        .where('updatedAt', '<', thirtyDaysAgo)
        .get();
      
      const batch = db.batch();
      
      expiredListings.forEach(doc => {
        batch.update(doc.ref, { status: 'expired' });
      });
      
      await batch.commit();
      
      console.log(`Marked ${expiredListings.size} listings as expired`);
      return null;
    } catch (error) {
      console.error('Error in cleanupExpiredListings:', error);
      return null;
    }
  });

// Generate analytics data
exports.generateDailyAnalytics = functions.pubsub
  .schedule('every day 02:00')
  .timeZone('Africa/Conakry')
  .onRun(async (context) => {
    try {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      const startOfDay = new Date(yesterday);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(yesterday);
      endOfDay.setHours(23, 59, 59, 999);
      
      // Count new users
      const newUsersQuery = await db.collection('users')
        .where('createdAt', '>=', startOfDay)
        .where('createdAt', '<=', endOfDay)
        .get();
      
      // Count new listings
      const newListingsQuery = await db.collection('listings')
        .where('createdAt', '>=', startOfDay)
        .where('createdAt', '<=', endOfDay)
        .get();
      
      // Count new requests
      const newRequestsQuery = await db.collection('requests')
        .where('createdAt', '>=', startOfDay)
        .where('createdAt', '<=', endOfDay)
        .get();
      
      // Store analytics
      await db.collection('analytics').doc(`daily_${yesterday.toISOString().split('T')[0]}`).set({
        date: yesterday,
        newUsers: newUsersQuery.size,
        newListings: newListingsQuery.size,
        newRequests: newRequestsQuery.size,
        generatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      console.log('Daily analytics generated successfully');
      return null;
    } catch (error) {
      console.error('Error generating analytics:', error);
      return null;
    }
  });

// Helper Functions

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function toRad(value) {
  return value * Math.PI / 180;
}

function calculateMatchScore(listing, request) {
  let score = 100;
  
  // Price match score (closer to budget = higher score)
  const priceRange = request.budgetMax - request.budgetMin;
  const priceDeviation = Math.abs(listing.price - ((request.budgetMax + request.budgetMin) / 2));
  const priceScore = Math.max(0, 100 - (priceDeviation / priceRange) * 50);
  
  // Location score (closer = higher score)
  const distance = calculateDistance(
    listing.location.latitude,
    listing.location.longitude,
    request.location.latitude,
    request.location.longitude
  );
  const locationScore = Math.max(0, 100 - distance * 5);
  
  // Combine scores
  score = (priceScore * 0.6) + (locationScore * 0.4);
  
  return Math.round(score);
}

async function sendNotificationToUser(notification) {
  try {
    // Get user's FCM tokens
    const userDoc = await db.collection('users').doc(notification.userId).get();
    
    if (!userDoc.exists) {
      return;
    }
    
    const userData = userDoc.data();
    const fcmTokens = userData.fcmTokens || [];
    
    if (fcmTokens.length === 0) {
      return;
    }
    
    // Create notification payload
    const payload = {
      notification: {
        title: notification.title,
        body: notification.body,
        icon: 'default',
        sound: 'default'
      },
      data: notification.data || {}
    };
    
    // Send to all user's devices
    const responses = await Promise.allSettled(
      fcmTokens.map(token => messaging.send({
        ...payload,
        token: token
      }))
    );
    
    // Remove invalid tokens
    const invalidTokens = [];
    responses.forEach((response, index) => {
      if (response.status === 'rejected' && 
          response.reason.code === 'messaging/registration-token-not-registered') {
        invalidTokens.push(fcmTokens[index]);
      }
    });
    
    if (invalidTokens.length > 0) {
      const validTokens = fcmTokens.filter(token => !invalidTokens.includes(token));
      await db.collection('users').doc(notification.userId).update({
        fcmTokens: validTokens
      });
    }
    
    // Store notification in database
    await db.collection('notifications').add({
      userId: notification.userId,
      title: notification.title,
      body: notification.body,
      data: notification.data || {},
      read: false,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}
