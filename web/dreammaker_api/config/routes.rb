Rails.application.routes.draw do
  
  namespace :api, defaults: { format: :json },
      constraints: { subdomain: 'api' }, path: '/' do
    scope module: :v1 do
      resources :rating_statuses, only: [:index, :show, :create, :update]
      resources :friendships, only: [:create, :index, :show, :destroy]
      resources :dreams, except: [:edit, :new] do
        resources :steps, except: [:edit, :new]
      end
      resources :users, only: [:index, :show, :create, :update, :destroy] 
    end
    mount_devise_token_auth_for 'User', at: 'api/v1/auth'
  end
end
