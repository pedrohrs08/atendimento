class RequestsWorker 
  include Sneakers::Worker
  from_queue "requests"


  def work(raw_post)
    p raw_post
    WebsocketRails['requests'].trigger('new', raw_post)
    ack! # we need to let queue know that message was received
  end
end