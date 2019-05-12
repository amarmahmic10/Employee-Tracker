package testing;


import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertTrue;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class Test10HOME {
	
		String exePath;
		WebDriver driver;
		
		
		//setUp method is used to establish basic setup for test method
		@Before
		public void setUp() throws Exception {
			exePath = "C:\\Users\\Amela\\Desktop\\chromedriver\\chromedriver.exe";
			System.setProperty("webdriver.chrome.driver", exePath);
			driver = new ChromeDriver();	
			driver.get("http://localhost/EmployeeTracker/app/#!/");	
		}
		
		
		//-----------------------------------------------------------------------------------------
		//Test to check form
		@Test
		public void form1() {
			driver.findElement(By.xpath("/html/body/div/div/div/div/div/div/div[2]/div/div[2]/form/div[1]/div/div/input")).sendKeys("Amar");
			driver.findElement(By.xpath("/html/body/div/div/div/div/div/div/div[2]/div/div[2]/form/div[2]/div/div/input")).sendKeys("Test123");
			driver.findElement(By.xpath("/html/body/div/div/div/div/div/div/div[2]/div/div[2]/form/button")).click();
	
		}
		
		//Test to check title - starts with
		@Test
		public void titleStartsWithTrue() {
			assertTrue(driver.getTitle().startsWith("Employee"));

		}
		
		//Test to check title - doesn't start with
		@Test
		public void titleStartsWithFalse() {
			assertFalse(driver.getTitle().startsWith("contacts"));
		}
		
		//Test to check title - equals
		@Test
		public void titleValueTrue() {
			String title=driver.getTitle();
			System.out.println(title);
			assertEquals(title,"Employee Tracker");
		}
		
		//Test to check title - doesn't equal
		@Test
		public void titleValueFalse() {
			String title=driver.getTitle();
			System.out.println(title);
			assertNotEquals(title,"Contacts");
		}
			
		
		//Test to check title of - is of length
		@Test
		public void titleLengthTrue() {
			int len = driver.getTitle().length();
			System.out.println(len);
			assertEquals(len,16);
		}
					
	
		//Test to title - isn't of length
		@Test
		public void titleLengthFalse() {
				
			int len = driver.getTitle().length();
			
			System.out.println(len);
			assertNotEquals(len,3);
		}
						
				
		//-----------------------------------------------------------------------------------------
		//tearDown method is used to close all initialized connections
		@After
		public void tearDown() throws Exception {
			driver.close();
		}


}

