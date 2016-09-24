Rails.application.routes.draw do

  devise_for :users

	root to: "cars#home"

	resources :cars

	get "/upload", to: "users#new"
	post "/upload", to: "users#create", as: :new_avatar
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
