class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def mobile_app_version
    render json: ENV["MOBILE_APP_VERSION"]
  end
end
