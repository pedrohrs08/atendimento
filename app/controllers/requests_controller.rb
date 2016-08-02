class RequestsController < WebsocketRails::BaseController
  def receive_request
  	 p message
  	 send_message :request_received, message, :namespace => :requests
  end
end
