// self.addEventListener('fetch', e => {
//     e.respondWith(
//         fetch(e.request).catch(error =>{
//             console.log(error);
//         })
//     )
// });
console.log('xa');
self.addEventListener('fetch', event => {
    // console.log(event);
    var request = event.request;
    if (request.mode === 'navigate' ||
      (request.method === 'GET' &&
       request.headers.get('accept').includes('text/html'))) {
      event.respondWith(
        fetch(request).catch(error => {
          return new Response('<p>Oh, dear. mama oh dear me, rats ate my dragon-Tiger</p>',
            { headers: { 'Content-Type': 'text/html' } });
        })
      );
    }
  });