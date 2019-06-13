package testing;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;

import com.paulhammant.ngwebdriver.NgWebDriver;

public class Test4 {
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
		driver.get("http://localhost:3000/#!/users/create");	
	}
	
	//-----------------------------------------------------------------------------------------
	//Test to check add new employee 
	@Test
	public void addNewUser() {
		
		driver.findElement(By.name("username")).sendKeys("Amela	");
	   	driver.findElement(By.name("password")).sendKeys("Amela123");
	   	driver.findElement(By.name("confirm_password")).sendKeys("Amela123");
	   	driver.findElement(By.name("firstname")).sendKeys("Amela");
	   	driver.findElement(By.name("lastname")).sendKeys("Vatres");

	   	Select s=new Select(driver.findElement(By.id("userType")));
	   	s.selectByVisibleText("User");
	   	

	   	driver.findElement(By.id("submitButton")).click();

	}
	
	//-----------------------------------------------------------------------------------------
	//tearDown method is used to close all initialized connections
	@After
	public void tearDown() throws Exception {
		driver.close();
	}
	
		
}
