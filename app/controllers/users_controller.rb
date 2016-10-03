class UsersController < ApplicationController
	before_action :authenticate_user!

	
	def new
			@user = current_user
			render :new
	end

	def create
		@user = User.new
			if @user.save
					Welcomeailer.welcome_email(@user).deliver_now
		else 
	  @user = current_user

	  if params[:user] != nil
		  @user.update(user_params)
		 end


	 	# if @user.update(user_params)
	 	# 	render plain: "did save!"
	 	# else
	 	# 	render plain: "not saved!"
	 	# end

	 	#render plain: params.inspect
	 	redirect_to "/"
	 	#render 'image'

	end
end

private

# Use strong_parameters for attribute whitelisting
# Be sure to update your create() and update() controller methods.

def user_params
  	params.require(:user).permit(:avatar)
	end
end
