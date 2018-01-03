require 'test_helper'

class UsersLoginTest < ActionDispatch::IntegrationTest
  def setup
    @user = users(:michael)
  end

  test "login with invalid information" do
    post api_sessions_path, params: {session: {email: "", password: ""}}
    assert_not is_logged_in?
  end

  test "login with valid information" do
    post api_sessions_path, params: { session: 
                          {
                            email: @user.email, 
                            password: 'password'
                          }}
    assert is_logged_in?                          
  end  

  test "login with valid information followed by logout" do
    post api_sessions_path, params: { session: 
                          {
                            email: @user.email, 
                            password: 'password'
                          }}
    assert is_logged_in?   
    delete api_session_path(@user)
    assert_not is_logged_in?
  end



  test "login with remembering" do
    log_in_as(@user, remember_me: true)
    assert_equal cookies['remember_token'], assigns(:user).remember_token
  end

  test "login without remembering" do
    log_in_as(@user, remember_me: true)    
    assert_not_empty cookies['remember_token']
    delete api_session_path(@user)
    log_in_as(@user, remember_me: 'false')
    assert_empty cookies['remember_token']
  end
  
end