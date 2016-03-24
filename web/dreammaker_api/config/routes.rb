Rails.application.routes.draw do
  devise_for :users, :controllers => {sessions: 'user/sessions', registrations: 'user/registrations', passwords: 'user/passwords' }

  scope module: 'api', defaults: { format: :json } do
    namespace :v1 do
      resources :dreams
    end
  end


end
