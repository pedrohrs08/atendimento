require 'test_helper'

class RequestsControllerTest < ActionController::TestCase
  test "should get receive_request" do
    get :receive_request
    assert_response :success
  end

end
