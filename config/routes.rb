Rails.application.routes.draw do



  root 'home#index'
  get '/tasks', to: 'home#index'
  get '/account', to: 'home#index'
  get '/contact', to: 'home#index'
  get '/setting', to: 'home#index'
  get '/signup', to: 'home#index'
  get '/login', to: 'home#index'
  
  namespace :api, format: 'json' do
    resources :users, only: [:index, :show, :create, :update]

    scope shallow_prefix: "sekret" do
      resources :users do
        resources :categories, only: [:create, :destroy, :update], shallow: true
        resources :tasks, only: [:index, :create, :update], shallow: true        
      end
    end   
    resources :sessions
  end
end
