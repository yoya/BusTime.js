#all: bs_aya41_hayakawa_chuo_1_ebina bs_aya41_ebina_hayakawa_chuo_1
# 参考) http://www.jsk.t.u-tokyo.ac.jp/~k-okada/makefile/
IMPORT=node import.js
# 海老名
URL1="https://transfer.navitime.biz/sotetsu/pc/diagram/BusDiagram?orvCode=00140212&course=0003400410&stopNo=1&date=2026-03-28"
FILE1=data/bs_aya61_ebina_to_hayakawa_chuo_1.json
URL2="https://transfer.navitime.biz/sotetsu/pc/diagram/BusDiagram?orvCode=00140212&course=0003400105&stopNo=1&date=2026-04-01"
FILE2=data/bs_aya41_ebina_to_ayase_syako.json

URL3="https://transfer.navitime.biz/sotetsu/pc/diagram/BusDiagram?orvCode=00140277&course=0003400148&stopNo=9&date=2026-04-01"
FILE3=data/bs_aya61_hayakawa_chuo_1_to_ebina.json
URL4="https://transfer.navitime.biz/sotetsu/pc/diagram/BusDiagram?orvCode=00140277&course=0003400148&stopNo=9&date=2026-04-01"
FILE4=data/bs_aya41_ayase_syako_to_ebina.json


all:
	$(IMPORT) $(URL1) > $(FILE1)
	$(IMPORT) $(URL2) > $(FILE2)
	$(IMPORT) $(URL3) > $(FILE3)
	$(IMPORT) $(URL4) > $(FILE4)
	echo Done
