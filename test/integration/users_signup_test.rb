require 'test_helper'

class UsersSignupTest < ActionDispatch::IntegrationTest
 test "valid signup information" do
  assert_difference 'User.count', 1 do
    post api_users_path, params: { user: 
                      {
                        email: "user@example.com",
                        user_id: "exampleuser",
                        password: "password",
                        password_confirmation: "password"
                      } }
    end
    assert is_logged_in?
 end
end
