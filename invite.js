// const binURL = 'https://api.jsonbin.io/v3/b/66d86dacad19ca34f89fecea'; // Replace with your bin URL
// const apiKey = '$2a$10$9M/1/1Vs24cSFiI7pjx5l.TKc4xzS2MnVe/buD0tV79mz4MW3mMDO'; // Replace with your API key

// Unique user info (replace this with actual Telegram user info)
const username = 'exampleUser'; // Replace with the actual Telegram username
let uniqueId = localStorage.getItem('inviteLink'); // Check if the invite link is already stored

// Generate a unique ID for the invite link (only if it doesn't exist)
if (!uniqueId) {
    uniqueId = generateUniqueId(20);
    localStorage.setItem('inviteLink', uniqueId); // Save the link in localStorage
    // saveInviteToBin(username, uniqueId);
}

// Function to create a unique ID (if not already generated)
function generateUniqueId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}


var inviteLink = 'http://t.me/OficialCPTOBOT/CPTO?start=' + uniqueId;

document.getElementById('invite-ink').textContent = inviteLink;

document.getElementById("inviteBtn").addEventListener('click',function(){
    var telegramShareLink = 'tg://msg_url?url=' + encodeURIComponent(inviteLink);
            
    // Open the Telegram share link in a new window
    window.location.href = telegramShareLink;
})




// // Save the invite data to JSONBin
// function saveInviteToBin(username, inviteId) {
//     const inviteData = {
//         username: username,
//         inviteId: inviteId,
//         invitedUsers: [] // List to track invited friends
//     };

//     fetch(binURL, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'X-Master-Key': apiKey
//         },
//         body: JSON.stringify(inviteData)
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log('Invite saved successfully:', data);
//     })
//     .catch(error => {
//         console.error('Error saving invite:', error);
//     });
// }

// // Check if the app was opened with an invite link and reward the inviter
// function checkInviteLink() {
//     const urlParams = new URLSearchParams(window.location.search);
//     const inviteId = urlParams.get('startapp');

//     if (inviteId) {
//         fetch(binURL, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-Master-Key': apiKey
//             }
//         })
//         .then(response => response.json())
//         .then(data => {
//             const invites = data.record;
//             const invite = invites.find(invite => invite.inviteId === inviteId);

//             if (invite) {
//                 // Add the current user to the inviter's invitedUsers list
//                 const newFriend = {
//                     name: username, // Replace with actual friend's name from Telegram
//                     reward: 100 // Each friend brings 100 GOO
//                 };

//                 invite.invitedUsers.push(newFriend);
//                 updateInviteInBin(invite);

//                 // Update the UI with the new friend and reward the inviter
//                 updateFriendsList(invite.invitedUsers);
//             } else {
//                 console.log('Invalid invite link');
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching invite data:', error);
//         });
//     }
// }

// // Update invite data in JSONBin (after adding new friend)
// function updateInviteInBin(updatedInvite) {
//     fetch(`${binURL}/${updatedInvite.id}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//             'X-Master-Key': apiKey
//         },
//         body: JSON.stringify(updatedInvite)
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log('Invite updated successfully:', data);
//     })
//     .catch(error => {
//         console.error('Error updating invite:', error);
//     });
// }

// // Update the friends list and GOO count in the UI
// function updateFriendsList(friends) {
//     const friendsList = document.getElementById('friendsList');
//     const friendsCount = document.getElementById('friendsCount');

//     // Clear existing friends list
//     friendsList.innerHTML = '';

//     // Update friends count
//     friendsCount.textContent = `${friends.length} friends (Top 100)`;

//     // Display each friend in the list
//     friends.forEach(friend => {
//         const friendItem = document.createElement('li');
//         friendItem.className = 'friend-item';

//         friendItem.innerHTML = `
//             <div class="friend-avatar">${friend.name.charAt(0)}</div>
//             <div class="friend-name">${friend.name}</div>
//             <div class="friend-details">
//                 <div class="friend-cats">+${friend.reward} GOO</div>
//             </div>
//         `;

//         friendsList.appendChild(friendItem);
//     });
// }

// // Example usage: check invite link when user visits the app
// checkInviteLink();
