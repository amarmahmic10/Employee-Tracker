package testing;

import static org.junit.Assert.*;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;

import com.paulhammant.ngwebdriver.NgWebDriver;

public class Test3 {
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
		driver.get("http://localhost:3000/#!/positions");	
	}
	
	//-----------------------------------------------------------------------------------------
	//Test to check add new employee 
	@Test
	public void addNewPosition() {
		
		driver.findElement(By.id("name")).sendKeys("Rector");
	   
	   	driver.findElement(By.id("submitButton")).click();
	   	
	   	driver.findElement(By.id("editButton")).click();

	}
			
	//-----------------------------------------------------------------------------------------
	//tearDown method is used to close all initialized connections
	@After
	public void tearDown() throws Exception {
		driver.close();
	}
	
	
	
}
