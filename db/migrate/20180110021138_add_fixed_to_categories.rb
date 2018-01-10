class AddFixedToCategories < ActiveRecord::Migration[5.1]
  def change
    add_column :categories, :fixed, :boolean, default: false
  end
end
