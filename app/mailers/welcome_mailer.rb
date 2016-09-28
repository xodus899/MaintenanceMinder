class WelcomeMailer < ApplicationMailer
	default from: "maintenanceminder@hotmail.com"

	def welcome_email(user)
		@user = user
		mail(to: @user.email, subject: "Welcome, #{@user.name}")
	end
end
