
$(document).ready(function(){
    // var transEffect = Barba.BaseTransition.extend({
    //     start: function(){
    //       this.newContainerLoading.then(val => this.slideUpNewcontent($(this.newContainer)));
    //     },
    //     slideUpNewcontent: function(nc) {
    //       nc.hide();
    //       var _this = this;
    //       $(this.oldContainer).fadeOut(1000).promise().done(() => {
    //         nc.css('visibility','visible');
    //         nc.fadeIn(1000, function(){
    //           _this.done();
    //         })
    //       });
    //     }
    // });
    // Barba.Pjax.getTransition = function() {
    //   return transEffect;
    // }
    // Barba.Pjax.start();

    $('.about').on('click', function() {

      // call /about
      $.get('/about', function(data) {     
  
          // fadeout content block and empty page content
          $('.barba-container').fadeOut(1000).empty();
  
          // add data from /about to content and fadein
          $('.barba-container').html(data).fadeIn(1000);
      });
  });

});







