class WebsiteController < ApplicationController
  def new
    @websites = Website.order 'created_at DESC'
  end

  def create
    params[:url_list].each do |url|
      Website.new(:url => url).save
    end
    render :json=>params[:url_list].to_json
  end

  def online
    render :json=>Website.all.map(&:url).to_json
  end
end
