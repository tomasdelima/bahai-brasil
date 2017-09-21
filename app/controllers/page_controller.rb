class PageController < ApplicationController
  protect_from_forgery with: :null_session

  def update
    page = Page.find(params[:id])
    page.body = params[:body]
    render json: page.save
  end
end
