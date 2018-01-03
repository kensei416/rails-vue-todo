require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(
      email: "user@example.com", user_id: "user",
      password: "foobar", password_confirmation: "foobar"
      )

  end

  test "should be valid" do
    assert @user.valid?
  end


  test "email should be present" do
    @user.email = " "
    assert_not @user.valid?
  end

  test "user_id should be present" do
    @user.user_id = ""
    assert_not @user.valid?
  end

  test "email should not be too long" do
    @user.email = "a" * 244 + "@example.com"
    assert_not @user.valid?
  end

  test "user_id should not be too long" do
    @user.user_id = "a" * 50
    assert_not @user.valid?
  end
  
  test "email validation should reject invalid addresses" do
    invalid_addresses = %w[user@example,com user_at_foo.org user.name@example.
                           foo@bar_baz.com foo@bar+baz.com]
    invalid_addresses.each do |invalid_address|
      @user.email = invalid_address
      assert_not @user.valid?, "#{invalid_address.inspect} should be invalid"
    end
  end

  test "user_id validation should reject invalid id" do
    invalid_ids = %w[およう ken;fsdaf ホゲホゲ]
    invalid_ids.each do |invalid_id| 
      @user.user_id = invalid_id
      assert_not @user.valid?, "#{invalid_id.inspect} should be invalid"
    end
  end
  
  test "email addresses should be unique" do
    duplicate_user = @user.dup
    duplicate_user.email = @user.email.upcase
    @user.save
    assert_not duplicate_user.valid?
  end
  
  test "email addresses should be saved as lower-case" do
    mixed_case_email = "Foo@ExAMPle.CoM"
    @user.email = mixed_case_email
    @user.save
    assert_equal mixed_case_email.downcase, @user.reload.email
  end

  test "user_id should be save as lower-case" do
    New_user_id = "KENSEI"
    @user.user_id = New_user_id.downcase
    assert @user.save 
    assert_equal New_user_id.downcase, @user.reload.user_id
  end

  test "password should be present (nonblank)" do
    @user.password = @user.password_confirmation = "" * 6
  end

  test "password should have a minimum length" do
    @user.password = @user.password_confirmation = "a" * 5
    assert_not @user.valid?
  end

  test "associated categories should be destroyed" do
    @user.save
    category = @user.categories.create!(title: "home", user_id: @user.id)
    task = category.tasks.create!(title: "Home")
    assert_difference 'Task.count', -1 do
      @user.destroy
    end
  end

  test "authenticated? should return false for a user with nil digest" do
    assert_not @user.authenticated?("")
  end
end