require 'sinatra'

set :static, true

# later prepend /app/ to all static calls

get '/' do
  File.read(File.join('public', 'app', 'index.html'))
end
