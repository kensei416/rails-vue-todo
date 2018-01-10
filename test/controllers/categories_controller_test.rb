require 'test_helper'

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup 
    @user = users(:michael)
    @Category = @user.categories.new(title: "Lorem ipsum", user_id: @user.id, fixed: true)
  end

  test "freezing category should not delete" do
    @Category.save
    assert @Category.valid?
    @Category.destroy
    assert_no_difference 'Category.count' do
      @Category.destroy
    end
  end

end
