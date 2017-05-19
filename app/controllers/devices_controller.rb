class DevicesController < ApplicationController
   skip_before_action :verify_authenticity_token

  def create
    render json: !!Device.find_or_create_by(os: params[:os], token: params[:token])
  end
end
