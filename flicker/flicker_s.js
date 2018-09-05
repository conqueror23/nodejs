const Flickr=require('flickrapi');
let flickrOptions = {
      api_key: "ea02de069c0d0ab6c9127a03838ec3c1",
      secret: "1786dffd4ec6b4e4"
    };

Flickr.tokenOnly(flickrOptions, function(error, flickr) {
  flickr.photos.search({text: "red+panda"}, function(err, result) {
  if(err) {
     throw new Error(err);
   }
  result.photos.photo.forEach(e=>{
    let url='https://farm'+e.farm+'.staticflickr.com/'+e.server+'/'+e.id+'_'+e.secret+'.jpg';
    console.log(url);
  });
  });

});
