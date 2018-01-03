json.set! :task do
  json.extract! @task, :id, :title, :is_done, :fav, :category_id,  :created_at, :updated_at
end
