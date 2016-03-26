require 'test_helper'

class WebsiteControllerTest < ActionController::TestCase
  test "should get new" do
    get :new
    assert_response :success
  end

  test "should get create" do
    get :create
    assert_response :success
  end

  test "should get online" do
    get :online
    assert_response :success
  end

end
