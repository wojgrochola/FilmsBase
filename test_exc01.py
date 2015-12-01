import unittest
import exc01

class TestPrint_result(unittest.TestCase):
    def test_get_cpu_return_string(self):
        myDaemon = exc01.MyDaemon('/path', 'all')
        expected_msg = "Ram usage: 56%"
        self.assertEqual(isinstance(myDaemon.getCpu(), str), isinstance(expected_msg, str))

    def test_get_ram_return_string(self):
        myDaemon = exc01.MyDaemon('/path', 'all')
        expected_msg = "example mess"
        self.assertEqual(isinstance(myDaemon.getRam(), str), isinstance(expected_msg, str))

    def test_get_duo_return_string(self):
        myDaemon = exc01.MyDaemon('/path', 'all')
        expected_msg = "example mess"
        self.assertEqual(isinstance(myDaemon.getDuo(), str), isinstance(expected_msg, str))

if __name__ == "__main__":
    unittest.main()