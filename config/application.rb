require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module MaintenanceMinder
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    config.action_mailer.delivery_method = :smtp
		config.action_mailer.smtp_settings = {
		  :authentication => :plain,
		  :address => "smtp.mailgun.org",
		  :port => 587,
		  :domain => ENV["mail_gun_domain"],
		  :user_name => ENV["mail_gun_user_name"],
		  :password => ENV["mail_gun_password"]
		}
  end
end
