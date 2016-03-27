Rails.application.routes.draw do
  
  namespace :api, defaults: { format: :json },
      constraints: { subdomain: 'api' }, path: '/' do
    scope module: :v1 do
      
      resources :dreams
      resources :users, only: [:index, :show, :create, :update, :destroy]
    end
    mount_devise_token_auth_for 'User', at: 'api/v1/auth'
  end
end
