$(document).on('ready page:load', function() {
  if($('.videos.index').length == 0) return;
});


/*
$(".video select").change(function(e){
  $('.buttons').hide();

        fileReady: function(fileUrl){
          $.ajax({ url: "videos.json", type: 'POST',
            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
            data: {video: {client_id: clientId, url: fileUrl}},
            success: function(response) { 
              $('.loading-indicator').hide(); 
            }
          });
        }
      });


    }
  });
});*/