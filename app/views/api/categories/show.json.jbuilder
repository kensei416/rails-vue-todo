json.set! :category do
  json.extract! @category, :id, :title, :created_at, :updated_at
end
