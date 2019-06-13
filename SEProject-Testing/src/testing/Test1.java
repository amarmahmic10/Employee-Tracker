package testing;

import static org.junit.Assert.*;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import com.paulhammant.ngwebdriver.NgWebDriver;

public class Test1 {

	String exePath;
	WebDriver driver;
	

	//setUp method is used to establish basic setup for test method
	@Before
	public void setUp() throws Exception {
		exePath = "C:\\Users\\Amela\\Desktop\\chromedriver\\chromedriver.exe";
		System.setProperty("webdriver.chrome.driver", exePath);
		driver = new ChromeDriver();	
		NgWebDriver ngWebDriver = new NgWebDriver((JavascriptExecutor) driver);
		ngWebDriver.waitForAngularRequestsToFinish();
		driver.get("http://localhost:3000/#!/");	
	}
	
	//-----------------------------------------------------------------------------------------
	//Test to check login 
	@Test
	public void LogIn() {
	  	driver.findElement(By.name("username")).sendKeys("Admin");
	   	driver.findElement(By.name("password")).sendKeys("Asd123");
	   	driver.findElement(By.id("submitButton")).click();
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
