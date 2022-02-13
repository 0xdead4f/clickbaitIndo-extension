chrome.runtime.onMessage.addListener( data => {
  if ( data.type === 'notification' ) {
          chrome.notifications.create(
              '',
              {
                  type: 'basic',
                  title: 'IndoClickbait',
                  message: data.message || 'IndoClickbait!',
                  iconUrl: 'logo.png',
              }
          );
  }
});