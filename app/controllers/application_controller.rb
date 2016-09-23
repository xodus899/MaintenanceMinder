class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :configure_sign_up, if: :devise_controller?



protected

  def configure_sign_up
  	devise_parameter_sanitizer.permit(:sign_up , keys: [:name])
  end

end
