Rails.application.routes.draw do
  namespace :api, defaults: { format: :json },
      constraints: { subdomain: 'api' }, path: '/' do
    scope module: :v1 do
      
      resources :dreams, except: [:edit, :new] do
        resources :rating_statuses, only: [:index, :create, :update]
        resources :steps, except: [:edit, :new]
      end
      resources :users, except: [:edit, :new] do
        resources :friendships, only: [:create, :index, :show, :destroy]
      end
    end
    mount_devise_token_auth_for 'User', at: 'api/v1/auth'
  end
end
