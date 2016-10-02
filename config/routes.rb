Rails.application.routes.draw do

  devise_for :users

	root to: "pages#home"

	resources :cars, except:[:edit,:new,:index,:create,:show,:update,:destroy]

	resources :pages, except:[:show,:edit,:new,:index,:create,:show,:update,:destroy]

	get "/carsearch", to: "cars#show" 
	get "/users/edit",    to: "users#new"
	post "/upload",   to: "users#create", as: :new_avatar
	match '*path', to: redirect('/'), via: :all
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end



