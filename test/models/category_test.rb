require 'test_helper'

class CategoryTest < ActiveSupport::TestCase
  def setup 
    @user = users(:michael)
    @Category = @user.categories.new(title: "Lorem ipsum", user_id: @user.id)
  end


  test "should be valid" do
    assert @Category.valid?
  end

  test "user id should be present" do
    @Category.user_id = nil
    assert_not @Category.valid?
  end

  test "category should be present" do
    @Category.title = nil
    assert_not @Category.valid?
  end

  test "content should be at most 140 characters" do
    @Category.title = "a" * 141
    assert_not @Category.valid?
  end

  test "order should be most recent last" do
    assert_equal categories(:most_recent), Category.last
  end

  test "associated tasks should be destroyed" do
    @Category.save
    @Category.tasks.create!(title: "Something to do")
    assert_difference 'Task.count', -1 do
      @Category.destroy
    end
  end
end
