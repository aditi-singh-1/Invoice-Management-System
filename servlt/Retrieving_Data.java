package com.higradius;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.io.PrintWriter;
import java.sql.ResultSet;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;
import java.util.ArrayList;
import java.util.LinkedHashMap;

@WebServlet("/Retrieving_Data")
public class Retrieving_Data extends HttpServlet {
	private static final long serialVersionUID = 1L;
	// Driver and Database URL
	static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
	static final String DB_URL = "jdbc:mysql://localhost/h2h_internship";
	
	// Authentication Credentials
	static final String DB_USER = "root";
	static final String DB_PASS = "new_password";

	//Creating required Objects
	static Connection con = null;
	static PreparedStatement pst = null;
	
  

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
			try {
				Integer offset =  Integer.parseInt(request.getParameter("Offset"));
				int limit = Integer.parseInt(request.getParameter("Limit"));
				Class.forName("com.mysql.cj.jdbc.Driver");					
				con = DriverManager.getConnection(DB_URL,DB_USER,DB_PASS);  
				String query = "Select `name_customer`,`cust_number`,`doc_id`,`total_open_amount`,`due_in_date`,'--','--','notes' from invoice_details LIMIT ?,?";
				pst = con.prepareStatement(query);
				pst.setInt(1,offset);
				pst.setInt(2,limit);
				System.out.println(query);
				ResultSet rs = pst.executeQuery();
				ArrayList<LinkedHashMap<String,String>> result_arr = new ArrayList<>();  
				while(rs.next()) {
					LinkedHashMap<String,String> row_arr = new LinkedHashMap<>();
					row_arr.put("Customer Name",rs.getString(1));
					row_arr.put("Customer #",rs.getString(2));
					row_arr.put("Invoice #",rs.getString(3));
					row_arr.put("Invoice Amount",rs.getString(4));
					row_arr.put("Due Date",rs.getString(5));
					row_arr.put("Predict Payment Date",rs.getString(6));
					row_arr.put("Predict Aging Bucket",rs.getString(7));
					row_arr.put("Notes",rs.getString(8));
					result_arr.add(row_arr);    
				}
				PrintWriter out = response.getWriter();
				Gson gson = new Gson();
				String fulltable= gson.toJson(result_arr);
				response.setContentType("application/json");
	            response.setCharacterEncoding("UTF-8");
	            out.print(fulltable);
	            out.flush();
			}
			catch(Exception e) {
				e.printStackTrace();
			}
			
		}
		}
