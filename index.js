// Import stylesheets
import './style.css';
import liff from '@line/liff';
// Body element
const body = document.getElementById('body');

// Button elements
const btnSend = document.getElementById('btnSend');
const btnClose = document.getElementById('btnClose');
const btnShare = document.getElementById('btnShare');
const btnLogIn = document.getElementById('btnLogIn');
const btnLogOut = document.getElementById('btnLogOut');
const btnScanCode = document.getElementById('btnScanCode');
const btnOpenWindow = document.getElementById('btnOpenWindow');

// Profile elements
const email = document.getElementById('email');
const userId = document.getElementById('userId');
const pictureUrl = document.getElementById('pictureUrl');
const displayName = document.getElementById('displayName');
const statusMessage = document.getElementById('statusMessage');

// QR element
const code = document.getElementById('code');
const friendShip = document.getElementById('friendShip');

async function main() {
  // Initialize LIFF app)
  await liff.init({ liffId: '1657031793-j8VRyPX4' });
  // Try a LIFF function
  switch (liff.getOS()) {
    case 'android':
      body.style.backgroundColor = '#d1f5d3';
      break;
    case 'ios':
      body.style.backgroundColor = '#eeeeee';
      break;
  }
  getUserProfile();
  if (!liff.isInClient()) {
    if (liff.isLoggedIn()) {
      btnLogIn.style.display = 'none';
      btnLogOut.style.display = 'block';
      btnShare.style.display = 'block';
      getUserProfile();
    } else {
      btnLogIn.style.display = 'block';
      btnLogOut.style.display = 'none';
    }
  } else {
    getUserProfile();
    btnSend.style.display = 'block';
    btnShare.style.display = 'block';
  }
  btnOpenWindow.style.display = 'block';
  // scanQR code only android
  if (liff.isInClient() && liff.getOS() === 'android') {
    btnScanCode.style.display = 'block';
  }
}
main();
async function getUserProfile() {
  const profile = await liff.getProfile();
  pictureUrl.src = profile.pictureUrl;
  userId.innerHTML = '<b>userId:</b> ' + profile.userId;
  statusMessage.innerHTML = '<b>statusMessage:</b> ' + profile.statusMessage;
  displayName.innerHTML = '<b>displayName:</b> ' + profile.displayName;
  email.innerHTML = '<b>email:</b> ' + liff.getDecodedIDToken().email;
}
btnLogIn.onclick = () => {
  liff.login();
};

btnLogOut.onclick = () => {
  liff.logout();
  window.location.reload();
};
async function sendMsg() {
  if (
    liff.getContext().type !== 'none' &&
    liff.getContext().type !== 'external'
  ) {
    await liff.sendMessages([
      {
        type: 'text',
        text: 'สวัสดีจ้า',
      },
    ]);
    alert('Message sent');
  }
}
btnSend.onclick = () => {
  sendMsg();
};
async function shareMsg() {
  await liff.shareTargetPicker([
    {
      type: 'image',
      originalContentUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9HKfAq91FnrNHVxW1UOlsLxJw3yj6wFu6Zg&usqp=CAU',
      previewImageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9HKfAq91FnrNHVxW1UOlsLxJw3yj6wFu6Zg&usqp=CAU',
    },
    {
      type: 'text',
      text: 'ทดลองส่งรูป',
    },
  ]);
  if (result) {
    alert('Msg was shared!');
  } else {
    alert('Msg was cancelled by user');
  }
  liff.closeWindow();
}
btnShare.onclick = () => {
  shareMsg();
};
async function scanCode() {
  const result = await liff.scanCode();
  code.innerHTML = '<b>Code: </b>' + result.value;
}
btnScanCode.onclick = () => {
  scanCode();
};
btnOpenWindow.onclick = () => {
  liff.openWindow({
    url: window.location.href,
    external: true,
  });
};
