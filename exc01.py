#!/usr/bin/env python
 
import sys, time, commands, logging, optparse
from daemon import Daemon





class MyDaemon(Daemon):
		def __init__(self, filePath, flag):
			self.flag = flag
			Daemon.__init__(self, filePath)
			FORMAT = '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
			logging.basicConfig(filename='log.txt', level=logging.INFO, format=FORMAT)
		
		def run(self):
				while True:
					self.execute()
					time.sleep(30)

	

		def getCpu(self):
			cpu = commands.getoutput('grep "cpu " /proc/stat')
			cpu = cpu.split()
			cpuUsage = str((int(cpu[1])+int(cpu[3]))*100/(int(cpu[1]) + int(cpu[3]) + int(cpu[4])))
			return cpuUsage + "%"
	
		def getRam(self):
			memTotal = float(commands.getoutput('cat /proc/meminfo | grep MemTotal').split()[1])
			memFree =  float(commands.getoutput('cat /proc/meminfo | grep MemFree').split()[1])
			memProc = float ((memFree/memTotal) * 100)
			return "Ram usage: " + str(round(memProc, 2)) + "%"

		def getDuo(self):
			info = "Ram usage: " + self.getRam() + ", Cpu usage: " + self.getCpu();
			return info

		def execute(self):
			info = ""
			if (self.flag == 'processor'):
				info = self.getCpu()
			elif(self.flag == 'memory'):
				info = self.getRam()
			elif(self.flag == 'all'):
				info = self.getDuo()
			
			logging.info(info)
			  
	 
if __name__ == "__main__":
	parser = optparse.OptionParser("Usage: %s start | stop [options]")
	parser.add_option("-c", "--check", dest="value", default="all", help="What wil be log: -c memory | -c processor | -c all")
	(options, args) = parser.parse_args()
	if len(args) != 1:
		parser.error("Incorret number of arguments.")
	print 
	daemon = MyDaemon('/tmp/systemLogger.pid', options.value)
	if 'start' == args[0]:
		daemon.start()
	elif 'stop' == args[0]:
		daemon.stop()
	elif 'restart' == sys[0]:
		daemon.restart()
	else:
		parser.error("Unknown command. Use start|stop|restart ")
		sys.exit(0)

