class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.boolean :is_done, default: false, null: false
      t.boolean :fav, default: false, null: false
      t.references :category,  foreign_key: true
      t.timestamps
    end
    add_index :tasks, [:category_id, :created_at]
  end
end
