class PostsController < ApplicationController
  def index
    posts = Post.published.where("updated_at > '#{params[:updated_at] || 0}'").to_json(include: [:author, :paragraphs])
    respond_to do |format|
      format.json { render json: {data: posts, time: Time.now.utc} }
    end
  end
end
