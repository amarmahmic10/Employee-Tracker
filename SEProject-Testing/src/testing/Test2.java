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

public class Test2 {

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
		driver.get("http://localhost:3000/#!/employees/create");	
	}
	
	//-----------------------------------------------------------------------------------------
	//Test to check add new employee 
	@Test
	public void addNewEmployee() {
		
		driver.findElement(By.id("name")).sendKeys("Amela");
	   	driver.findElement(By.id("area")).sendKeys("Sarajevo");
	   	driver.findElement(By.id("contact")).sendKeys("+38762854683");
	   	Select s=new Select(driver.findElement(By.id("departmentSelector")));
	   	s.selectByVisibleText("");
	   	
	   	driver.findElement(By.id("salary")).sendKeys("+38762854683");

	   	driver.findElement(By.id("submitButton")).click();

	}
			
	//-----------------------------------------------------------------------------------------
	//tearDown method is used to close all initialized connections
	@After
	public void tearDown() throws Exception {
		driver.close();
	}
	
	
}
