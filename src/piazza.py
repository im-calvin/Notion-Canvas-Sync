from piazza_api import Piazza
from piazza_api.rpc import PiazzaRPC
from dotenv import load_dotenv
import os

# p = Piazza()
p = PiazzaRPC("l7ggtksfq994ji")
p.user_login(os.getenv("PIAZZA_USER"), os.getenv("PIAZZA_PW"))

user_profile = p.get_user_profile()

cpen221 = p.network("l7m075nny2la9")
cpen211 = p.network("l7ggtksfq994ji")
ece = p.network("kbi9wbpmc9h20")
math253 = p.network("l7du1zowwbi2t3")

p.request()
