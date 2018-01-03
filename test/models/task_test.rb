require 'test_helper'

class TaskTest < ActiveSupport::TestCase
  
  def setup
    @category = categories(:orange)
    @task = @category.tasks.new(title: "i must buy orange")
  end

  test "should be valid" do
    assert @task.valid?
  end

  test "user id should be present" do
    @task.category_id = nil
    assert_not @task.valid?
  end

  test "title should be present" do
    @task.title = " "
    assert_not @task.valid?
  end

  test "title should be at most 30 characters" do
    @task.title = "a" * 141
    assert_not @task.valid?
  end
end
