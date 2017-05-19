class PostsController < ApplicationController
  def index
    posts = Post.where("updated_at > '#{params[:updated_at] || Date.new(2000, 1, 1)}'").to_json(include: [:category, :paragraphs])
    respond_to do |format|
      format.json { render json: {data: posts, time: Time.now.utc} }
    end
  end

  def show
    respond_to do |format|
      format.json { render json: {data: Post.find(params[:id]).to_json(include: [:category, :paragraphs])} }
    end
  end
end
