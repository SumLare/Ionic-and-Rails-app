Rails.application.routes.draw do
  devise_for :users

    namespace :api, defaults: { format: :json },
        constraints: { subdomain: 'api' }, path: '/' do
      scope module: :v1 do
        resources :dreams
        resources :users, only: [:show, :create, :update, :destroy]
      end
    end

end
