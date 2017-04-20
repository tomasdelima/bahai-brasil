class ImagesController < ApplicationController
  def show
    image = Image.find(params[:id])
    image_data =  Paperclip.io_adapters.for(image.image).read
    send_data image_data, filename: image.image_file_name, disposition: 'inline'
  end
end
